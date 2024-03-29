import { CreateDescription } from "@/app/actions";
import Counter from "@/app/components/Counter";
import CreationBottomBar from "@/app/components/CreationBottomBar";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function DescriptionPage({
    params,
}: {
    params: { id: string };
}) {
    return (
        <>
            <div className="w-3/5 mx-auto">
                <h2 className="text-3xl font-semibold tracking-tight transition-colors">
                    Veuillez décrire votre maison le plus précisement possible
                </h2>
            </div>
            <form action={CreateDescription}>
                <input type="hidden" name="homeId" value={params.id} />
                <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5 mb-36">
                    <div className="flex flex-col gap-y-2">
                        <Label>Titre :</Label>
                        <Input
                            name="title"
                            type="text"
                            required
                            placeholder="Petit et simple..."
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label>Description</Label>
                        <Textarea
                            name="description"
                            required
                            placeholder="Decrivez votre maison..."
                        ></Textarea>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label>Prix</Label>
                        <Input
                            name="price"
                            type="number"
                            required
                            placeholder="Prix par nuit en €"
                            min={10}
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label>Image</Label>
                        <Input name="image" type="file" required />
                    </div>
                    <Card>
                        <CardHeader className="flex flex-col gap-y-5">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <h3 className="underline font-medium">
                                        Nombre de personne
                                    </h3>
                                    <p className="text-muted-foreground text-small">
                                        Combien de personnes pouvez-vous
                                        accueillir ?
                                    </p>
                                </div>
                                <Counter name="guests" />
                            </div>
                        </CardHeader>
                        <CardHeader className="flex flex-col gap-y-5">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <h3 className="underline font-medium">
                                        Chambre
                                    </h3>
                                    <p className="text-muted-foreground text-small">
                                        Combien de chambre avez-vous ?
                                    </p>
                                </div>
                                <Counter name="bedrooms" />
                            </div>
                        </CardHeader>
                        <CardHeader className="flex flex-col gap-y-5">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <h3 className="underline font-medium">
                                        Salle de bain
                                    </h3>
                                    <p className="text-muted-foreground text-small">
                                        Combien de salle de bain?
                                    </p>
                                </div>
                                <Counter name="bathrooms" />
                            </div>
                        </CardHeader>
                    </Card>
                </div>
                <CreationBottomBar />
            </form>
        </>
    );
}
