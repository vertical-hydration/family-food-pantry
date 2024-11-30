import { Form, useLoaderData } from "react-router";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { loader } from "../route";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";

export default function AdultsCard() {
  const loaderData = useLoaderData<typeof loader>();
  const [count, setCount] = useState(loaderData.adults);
  const increaseAdults = () => setCount(count + 1)
  const decreaseAdults = () => setCount(count - 1)

  const english = {
    title: "Household Adults",
    button: "Update",
    decrease: "Decrease",
    increase: "Increase",
    description: "Include only nonstudents over 18",
    adults: "Adults in Household",
    drawerTitle: "Set Number of Adults",
    cancel: "Cancel",
    noAdults: "There must be at least one adult in the household.",
    helperText: " Please have at least one student in the household."
  }

  const spanish = {
    title: "Adultos en la casa",
    description: "Incluir solo los estudiantes mayores de 18",
    adults: "Adultos en la casa",
    drawerTitle: "Establecer el número de adultos",
    button: "Actualizar",
    decrease: "Disminuir",
    increase: "Aumentar",
    cancel: "Cancelar",
    noAdults: "Debe haber al menos un adulto en la casa.",
    helperText: "Por favor tenga al menos un estudiante en la casa."
  }

  const lang = loaderData.language === "es" ? spanish : english

  const noAdults = count < 1;

  const noChange = count === loaderData.adults;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {lang.title}
        </CardTitle>
        <CardDescription>
          {lang.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-4 pb-0 max-w-96 mx-auto ">
          <div className="flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 md:h-12 md:w-12 shrink-0 rounded-full"
              onClick={decreaseAdults}
              disabled={count <= 1}
            >
              <Minus className="h-4 w-4 md:h-8 md:w-8" />
              <span className="sr-only"> {lang.decrease}</span>
            </Button>
            <div className="flex-1  text-center">
              <div className="text-7xl font-bold tracking-tighter">
                {count}
              </div>
              <div className="text-[0.70rem] uppercase text-muted-foreground">
                {lang.title}
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8  md:h-12 md:w-12 shrink-0 rounded-full"
              onClick={increaseAdults}
            >
              <Plus className="h-4 w-4 md:h-8 md:w-8" />
              <span className="sr-only">{lang.increase}</span>
            </Button>
          </div>
          <div className="mt-3 h-[120px]">
          </div>
        </div>
        <div className="text-sm text-red-500 font-bold">
          {noAdults && lang.noAdults}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col justify-between gap-6 md:flex-row md:gap-8 ">
        {
          !noChange &&
          <Form method="post" className="w-full md:w-auto" >
            <input type="hidden" name="intent" value="updateAdults" />
            <input type="hidden" name="adults" value={count} />
            <Button variant={"default"} className="w-full" disabled={noAdults}>
              {lang.button}
            </Button>
          </Form>
        }

      </CardFooter>
    </Card>
  )
}