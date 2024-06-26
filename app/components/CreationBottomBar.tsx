import { Button } from "@/components/ui/button";
import React from "react";
import { CreationSubmit } from "./SubmitButton";
import Link from "next/link";

export default function CreationBottomBar() {
    return (
        <div className="fixed w-full bottom-0 z-10 bg-white border-t h-24">
            <div className="container flex items-center justify-between mx-auto px-5 lg:px-10 h-full">
                <Button variant="secondary" size="lg">
                    <Link href="/">Annuler</Link>
                </Button>
                <CreationSubmit />
            </div>
        </div>
    );
}
