import { LoaderFunctionArgs } from "react-router";

const requireAuth = async (args: LoaderFunctionArgs)=>{
  const userId = "bROxxo3adedzFYFaOy7t"

  return {
    userId
  }
}

export {
  requireAuth
}