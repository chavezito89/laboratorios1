"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { JobsList } from "@/components/jobs-list"
import { JobsFilters } from "@/components/jobs-filters"

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Trabajos</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Trabajo
        </Button>
      </div>
      <JobsFilters />
      <JobsList />
    </div>
  )
}
