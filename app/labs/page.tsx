"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { LabsList } from "@/components/labs-list"

export default function LabsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Laboratorios</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Laboratorio
        </Button>
      </div>
      <LabsList />
    </div>
  )
} 