import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import ListOpenSemester from "./list-open-semesters";




export function OpenSemestersCard() {

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            Open Semesters
          </CardTitle>
          <CardDescription>
            These are the open semesters.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ListOpenSemester />
        </CardContent>
        <CardFooter>

        </CardFooter>
      </Card>
    </>
  )
}