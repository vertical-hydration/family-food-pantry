import { ChevronRightIcon } from "lucide-react";
import { Link, useLoaderData } from "@remix-run/react";
import { loader } from "../route";



export default function ListOpenSemester() {
  const { semesters } = useLoaderData<typeof loader>()




  return (
    <ul
      role="list"
      className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
    >
      {semesters.map((s) => {
        const enrolled = s.enrollment === "enrolled"
        return (
          <li key={s.id} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {
                    enrolled
                      ? s.name
                      : <Link
                        className={enrolled ? "disabled" : ""}
                        to={`/apply-semester/${s.id}`}>
                        <span className="absolute inset-x-0 -top-px bottom-0" />
                        {s.name}
                      </Link>

                  }
                </p>
                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                  Some placeholder text
                </p>
              </div>
            </div>
            <div className="flex items-center gap-x-4">
              <p className="text-sm font-medium leading-6 text-gray-900">

              </p>
            </div>
            <div className="flex shrink-0 items-center gap-x-4">
              <div className="flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 font-bold text-gray-900">
                  {
                    enrolled ? "Enrolled" : "Apply Now"
                  }

                </p>
              </div>
              {
                enrolled
                  ? null
                  : <ChevronRightIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
              }
            </div>
          </li>
        )
      })}
    </ul>

  )
}