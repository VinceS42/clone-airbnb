import Link from "next/link";
import Image from "next/image";

import { useCountries } from "../lib/getCountries";
import { AddToFavoriteButton, DeleteFromFavoriteButton } from "./SubmitButton";

import { Heart } from "lucide-react";
import { DeleteFromFavorite, addToFavorite } from "../actions";

interface iAppProps {
    imagePath: string;
    description: string;
    location: string;
    price: number;
    isInFavoriteListe: boolean;
    favoriteId: string;
    homeId: string;
    userId: string | undefined;
    pathName: string;
}

export default function ListingCard({
    imagePath,
    description,
    location,
    price,
    isInFavoriteListe,
    favoriteId,
    homeId,
    userId,
    pathName,
}: iAppProps) {
    const { getCountryByValue } = useCountries();
    const country = getCountryByValue(location);

    return (
        <div className="flex flex-col">
            <div className="relative h-72">
                <Image
                    src={`https://alsvzyoomsgpnzwufcrb.supabase.co/storage/v1/object/public/images/${imagePath}`}
                    alt="Image de la mainson"
                    fill
                    className="rounded-lg h-full object-cover"
                />

                {userId && (
                    <div className="z-10 absolute top-2 right-2">
                        {isInFavoriteListe ? (
                            <form action={DeleteFromFavorite}>
                                <input
                                    type="hidden"
                                    name="favoriteId"
                                    value={favoriteId}
                                />
                                <input
                                    type="hidden"
                                    name="userId"
                                    value={userId}
                                />
                                <input
                                    type="hidden"
                                    name="pathName"
                                    value={pathName}
                                />
                                <DeleteFromFavoriteButton />
                            </form>
                        ) : (
                            <form action={addToFavorite}>
                                <input
                                    type="hidden"
                                    name="homeId"
                                    value={homeId}
                                />
                                <input
                                    type="hidden"
                                    name="userId"
                                    value={userId}
                                />
                                <input
                                    type="hidden"
                                    name="pathName"
                                    value={pathName}
                                />
                                <AddToFavoriteButton />
                            </form>
                        )}
                    </div>
                )}
            </div>
            <Link href={`/home/${homeId}`} className="mt-2">
                <h3 className="font-medium text-base">
                    {country?.flag} / {country?.region}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2">
                    {description}
                </p>
                <p className="pt-2 text-muted-foreground">
                    <span className="font-medium text-black">€{price}</span> la
                    nuit
                </p>
            </Link>
        </div>
    );
}
