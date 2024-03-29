import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import {
    RegisterLink,
    LoginLink,
    LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { createAirbnbHome } from "../actions";

export default async function UserNav() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const createHomeWithId = createAirbnbHome.bind(null, {
        userId: user?.id as string,
    });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
                    <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
                    <img
                        src={
                            user?.picture ??
                            "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                        }
                        alt="Image de l'utilisateur"
                        className="rounded-full h-8 w-8 lg:block"
                    />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
                {user ? (
                    <>
                        <DropdownMenuItem>
                            <form action={createHomeWithId} className="w-full">
                                <button
                                    type="submit"
                                    className="w-full text-start font-bold"
                                >
                                    Votre chez vous
                                </button>
                            </form>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/listes">Ma listes</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/mes-favoris">Mes favoris</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/reservation">Mes reservations</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogoutLink className="w-full text-red-500">
                                Se déconnecter
                            </LogoutLink>
                        </DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuItem>
                            <RegisterLink className="w-full">
                                S'enregistrer
                            </RegisterLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <LoginLink className="w-full">
                                Se connecter
                            </LoginLink>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
