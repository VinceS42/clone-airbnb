"use client";

import { useState } from "react";
import { useCountries } from "@/app/lib/getCountries";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { SearchIcon } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import HomeMap from "./HomeMap";
import { Button } from "@/components/ui/button";
import { CreationSubmit } from "./SubmitButton";
import { Card, CardHeader } from "@/components/ui/card";
import Counter from "./Counter";

export default function SearchModalComponent() {
    const [step, setStep] = useState(1);
    const { getAllCountries } = useCountries();
    const [locationValue, setLocationValue] = useState("");

    function SubmitButtonLocal() {
        if (step === 1) {
            return (
                <Button onClick={() => setStep(step + 1)} type="button">
                    Suivant
                </Button>
            );
        } else if (step === 2) {
            return <CreationSubmit />;
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex items-center rounded-full border py-2 px-5 cursor-pointer">
                    <div className="flex h-full divide-x font-medium">
                        <p className="px-4">Destination?</p>
                        <p className="px-4">Quand?</p>
                        <p className="px-4">Voyageurs?</p>
                    </div>
                    <SearchIcon className="p-1 h-6 w-6 text-white bg-primary rounded-full" />
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]:">
                <form className="flex flex-col gap-4">
                    <input type="hidden" name="country" value={locationValue} />
                    {step === 1 ? (
                        <>
                            <DialogHeader>
                                <DialogTitle>Selectionnez un pays</DialogTitle>
                                <DialogDescription>
                                    Veuillez le pays de votre choix
                                </DialogDescription>
                            </DialogHeader>
                            <Select
                                required
                                onValueChange={(value) =>
                                    setLocationValue(value)
                                }
                                value={locationValue}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a Country" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Pays</SelectLabel>
                                        {getAllCountries().map((item) => (
                                            <SelectItem
                                                key={item.value}
                                                value={item.value}
                                            >
                                                {item.flag} {item.label} /{" "}
                                                {item.region}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <HomeMap locationValue={locationValue} />
                        </>
                    ) : (
                        <>
                            <DialogHeader>
                                <DialogTitle>
                                    Selectionné toutes les infos
                                </DialogTitle>
                                <DialogDescription>
                                    Veuillez choisir toutes les infos
                                    necessaire.
                                </DialogDescription>
                            </DialogHeader>
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
                        </>
                    )}
                    <DialogFooter>
                        <SubmitButtonLocal />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
