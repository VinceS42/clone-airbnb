import SelectedCategory from "@/app/components/SelectedCategory";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function StructureRoute() {
    return (
        <>
            <div className="w-3/5 mx-auto">
                <h2 className="text-3xl font-semibold tracking-tighter transition-colors">
                    Comment décririez-vous le mieux votre habition?
                </h2>
            </div>
            <form>
                <SelectedCategory />
                <div className="fixed w-full bottom-0 z-10 bg-white border-t h-24">
                    <div className="container flex items-center justify-between mx-auto px-5 lg:px-10 h-full">
                        <Button variant="secondary" size="lg">
                            <Link href="/">Annuler</Link>
                        </Button>
                        <Button size="lg">Sauvegarder</Button>
                    </div>
                </div>
            </form>
        </>
    );
}
