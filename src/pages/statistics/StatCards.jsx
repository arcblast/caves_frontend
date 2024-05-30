import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPinned, Network, Orbit, Users2 } from "lucide-react"

const StatCards = ({data}) => {
  const total_strains = data?.length

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 font-inter">
      <Card className='bg-primary text-background'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className="text-base font-medium">
            Total strains
          </CardTitle>
          <Orbit className="h-5 w-5" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total_strains}</div>
          {/* <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p> */}
        </CardContent>
      </Card>
      <Card className='bg-foreground text-background'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className="text-base font-medium">
            Total species
          </CardTitle>
          <Network className="h-5 w-5" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">NA</div>
          {/* <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p> */}
        </CardContent>
      </Card>
      <Card className='bg-primary text-background shadow'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className="text-base font-medium">
            Sampling sites
          </CardTitle>
          <MapPinned className="h-5 w-5" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2</div>
          {/* <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p> */}
        </CardContent>
      </Card>
      <Card className='bg-foreground text-background'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className="text-base font-medium">
            Collaborators
          </CardTitle>
          <Users2 className="h-5 w-5" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">NA</div>
          {/* <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p> */}
        </CardContent>
      </Card>
    </div>
  )
}

export default StatCards