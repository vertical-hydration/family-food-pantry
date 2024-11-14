import { Outlet } from "@remix-run/react";
import { FamilySidebar } from "~/components/standard/family-sidebar";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { PageHeader } from "./components/page-header";


export default function Layout() {

  return (
    <>
      <SidebarProvider>
        <FamilySidebar />
        <SidebarInset>
          <PageHeader />
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}