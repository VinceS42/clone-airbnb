import { use } from "react";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import prisma from "../lib/db";
import NoItems from "../components/NoItems";
import ListingCard from "../components/ListingCard";
import { it } from "node:test";

async function getData(userId: string) {
    const data = await prisma.home.findMany({
        where: {
            userId: userId,
            addedCategory: true,
            addedDescription: true,
            addedLocation: true,
        },
        select: {
            id: true,
            country: true,
            photo: true,
            description: true,
            price: true,
            Favorite: {
                where: {
                    userId: userId,
                },
            },
        },
        orderBy: {
            createdAT: "desc",
        },
    });
    return data;
}

export default async function MyHomes() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/");
    }

    const data = await getData(user.id);

    return (
        <section className="container mx-auto px-5 lg:px-10 mt-10">
            <h2 className="text-3xl font-semibold tracking-tight">
                Vos maisons
            </h2>
            {data.length === 0 ? (
                <NoItems
                    title="Vous n'avez pas de maisons."
                    description="Veuillez créer votre annonce pour la voir apparaitre ici."
                />
            ) : (
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mt-8">
                    {data.map((item) => (
                        <ListingCard
                            key={item.id}
                            homeId={item.id}
                            userId={user.id}
                            description={item.description as string}
                            location={item.country as string}
                            price={item.price as number}
                            favoriteId={item.Favorite[0]?.id}
                            isInFavoriteListe={
                                item.Favorite.length > 0 ? true : false
                            }
                            imagePath={item.photo as string}
                            pathName="/mes-maisons"
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
