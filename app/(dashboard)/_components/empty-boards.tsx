"use client"
import { useMutation } from "convex/react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { api } from "@/convex/_generated/api"
import { title } from "process"
import { useOrganization } from "@clerk/nextjs"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { toast } from "sonner"

export const EmptyBoards = () => {
    const { organization} = useOrganization();
    const {mutate, pending} = useApiMutation(api.board.create);

    const onClick = () => {
        if (!organization) return;

        mutate({
            orgId: organization.id,
            title: "Untitle"
        })
        .then((id) => {
            toast.success("Board created successfully")
            // TODO: redirect to board create
        })
        .catch(() => toast.error("Board creation failed"))
    }

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image
                src="/note.svg"
                height={110}
                width={110}
                alt="Empty"
            />
            <h2 className="text-2xl font-semibold mt-6">
                Create your first board
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Start by creating a board for your artist team
            </p>
            <div className="mt-6">
                <Button disabled={pending} onClick={onClick} size="lg">
                    Create board
                </Button>
            </div>
        </div>
    )
}