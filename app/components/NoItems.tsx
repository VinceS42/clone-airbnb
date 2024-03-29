import { File } from "lucide-react";

export default function NoItems() {
    return (
        <div className="flex flex-col min-h-[400px] items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 mt-10">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <File className="h-10 w-10 text-primary" />
            </div>
            <h2 className="mt-6 text-xl font-semibold">
                Désolé, il n'y a pas de résultat pour cette catégorie...
            </h2>
            <p className="mt-2 text-center text-sm leading-6 text-muted-foreground">
                Veuillez sélectionner un autre catégorie ou créer votre propre
                annonce !
            </p>
        </div>
    );
}
