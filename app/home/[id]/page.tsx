import Link from "next/link";
import Image from "next/image";
import { unstable_noStore as noStore } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import prisma from "@/app/lib/db";
import CategoriyShowcase from "@/app/components/CategoryShowcase";
import HomeMap from "@/app/components/HomeMap";
import SelectCalendar from "@/app/components/SelectCalendar";
import { createReservation } from "@/app/actions";
import { ReservationSubmitButton } from "@/app/components/SubmitButton";
import { useCountries } from "@/app/lib/getCountries";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

async function getData(homeId: string) {
    noStore();
    const data = await prisma.home.findUnique({
        where: {
            id: homeId,
        },
        select: {
            title: true,
            description: true,
            country: true,
            photo: true,
            bathrooms: true,
            bedrooms: true,
            guests: true,
            categoryName: true,
            price: true,
            Reservation: {
                where: {
                    homeId: homeId,
                },
            },
            User: {
                select: {
                    profileImage: true,
                    firstName: true,
                },
            },
        },
    });
    return data;
}

export default async function HomeRoute({
    params,
}: {
    params: { id: string };
}) {
    const data = await getData(params.id);

    const { getCountryByValue } = useCountries();
    const country = getCountryByValue(data?.country as string);

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    return (
        <div className="w-[75%] mx-auto mt-10 mb-10">
            <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
            <div className="relative h-[550px]">
                <Image
                    alt="Image de la maison"
                    src={`https://alsvzyoomsgpnzwufcrb.supabase.co/storage/v1/object/public/images/${data?.photo}`}
                    fill
                    className="rounded-lg h-full w-full object-cover "
                />
            </div>
            <div className="flex justify-between gap-x-24 mt-8">
                <div className="w-2/3">
                    <h3 className="text-xl font-medium">
                        {country?.flag} {country?.label} / {country?.region}
                    </h3>
                    <div className="flex gap-x-2 text-muted-foreground">
                        <p>{data?.guests} Personnes</p> *{" "}
                        <p>{data?.bedrooms} Chambres</p> *{" "}
                        <p>{data?.bathrooms} Salles de bains</p>
                    </div>
                    <div className="flex items-center mt-6">
                        <img
                            src={
                                data?.User?.profileImage ??
                                "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                            }
                            alt="Profil du patron"
                            className="w-11 h-11 rounded-full"
                        />
                        <div className="flex flex-col ml-4">
                            <h3 className="font-medium">
                                Créé par {data?.User?.firstName}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                2021
                            </p>
                        </div>
                    </div>
                    <Separator className="my-7" />
                    <CategoriyShowcase
                        categoryName={data?.categoryName as string}
                    />
                    <Separator className="my-7" />
                    <p className="text-muted-foreground">{data?.description}</p>
                    <Separator className="my-7" />
                    <HomeMap locationValue={country?.value as string} />
                </div>
                <form action={createReservation}>
                    <input type="hidden" name="homeId" value={params.id} />
                    <input type="hidden" name="userId" value={user?.id} />
                    <SelectCalendar reservation={data?.Reservation} />
                    {user?.id ? (
                        <ReservationSubmitButton />
                    ) : (
                        <Button className="w-full" asChild>
                            <Link href="/api/auth/login">Réserver</Link>
                        </Button>
                    )}
                </form>
            </div>
        </div>
    );
}
