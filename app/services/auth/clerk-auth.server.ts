import { LoaderFunctionArgs } from "@remix-run/node";


const requireAuth = async (args: LoaderFunctionArgs)=>{

  const userId = "bROxxo3adedzFYFaOy7t"

  return {
    userId
  }
}



export {
  requireAuth
}