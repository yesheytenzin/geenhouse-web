import EditDialog from "./EditDialog";
import DeleteThresholdDialog from "./delete-dialog";

export default function Action({ id }: { id: string }) {
  return (
    <div className="flex-col space-y-3">
      <div className="cursor-pointer font-semibold">
        <EditDialog id={id} />
      </div>
      <div className="cursor-pointer font-semibold">
        <DeleteThresholdDialog id={id} />
      </div>
    </div>
  );
}
