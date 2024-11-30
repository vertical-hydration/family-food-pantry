import { useLoaderData } from "react-router";




export default function AddressDisplay() {
  const { address, lang } = useLoaderData();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="text-lg font-bold">
          {lang.successTitle}
        </div>
        <div className="text-lg">
          {address.street}
        </div>
        <div className="text-lg">
          {address.unit}
        </div>
        <div className="text-lg">
          {address.city}, {address.state} {address.zip}
        </div>
      </div>
    </div>

  );
}