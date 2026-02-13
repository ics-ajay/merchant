import PlaceHeader from "@/src/components/places/placeheader";
import PlaceTable from "@/src/components/places/placeTable";
export default async function Places() {
  return (
    <div className="p-6">
      <PlaceHeader>
        <PlaceTable />
      </PlaceHeader>
    </div>
  );
}
