import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import prisma from "./lib/db";
import NoItems from "./components/NoItems";
import ListingCard from "./components/ListingCard";
import SkeletonCard from "./components/SkeletonCard";
import MapFilterItems from "./components/MapFilterItems";

async function getData({
    searchParams,
    userId,
}: {
    userId: string | undefined;
    searchParams?: {
        filter?: string;
        country?: string;
        guests?: string;
        bedrooms?: string;
        bathrooms?: string;
    };
}) {
    noStore();
    const data = await prisma.home.findMany({
        where: {
            addedCategory: true,
            addedLocation: true,
            addedDescription: true,
            categoryName: searchParams?.filter ?? undefined,
            country: searchParams?.country ?? undefined,
            guests: searchParams?.guests ?? undefined,
            bedrooms: searchParams?.bedrooms ?? undefined,
            bathrooms: searchParams?.bathrooms ?? undefined,
        },
        select: {
            photo: true,
            id: true,
            price: true,
            description: true,
            country: true,
            Favorite: {
                where: {
                    userId: userId ?? undefined,
                },
            },
        },
    });
    return data;
}

export default function Home({
    searchParams,
}: {
    searchParams?: {
        filter?: string;
        country?: string;
        guests?: string;
        bedrooms?: string;
        bathrooms?: string;
    };
}) {
    return (
        <div className="container mx-auto px-5 lg:px-10">
            <MapFilterItems />

            <Suspense key={searchParams?.filter} fallback={<SkeletonLoading />}>
                <ShowItems searchParams={searchParams} />
            </Suspense>
        </div>
    );
}

async function ShowItems({
    searchParams,
}: {
    searchParams?: {
        filter?: string;
        country?: string;
        guests?: string;
        bedrooms?: string;
        bathrooms?: string;
    };
}) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const data = await getData({
        searchParams: searchParams,
        userId: user?.id,
    });

    return (
        <>
            {data.length === 0 ? (
                <NoItems
                    description="Veuillez sélectionner un autre catégorie ou créer votre propre
                annonce !"
                    title="Désolé, il n'y a pas de résultat pour cette catégorie..."
                />
            ) : (
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 mt-8">
                    {data.map((item) => (
                        <ListingCard
                            key={item.id}
                            description={item.description as string}
                            imagePath={item.photo as string}
                            location={item.country as string}
                            price={item.price as number}
                            homeId={item.id}
                            userId={user?.id}
                            favoriteId={item.Favorite[0]?.id}
                            isInFavoriteListe={
                                item.Favorite.length > 0 ? true : false
                            }
                            pathName="/"
                        />
                    ))}
                </div>
            )}
        </>
    );
}

function SkeletonLoading() {
    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 mt-8">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
        </div>
    );
}
