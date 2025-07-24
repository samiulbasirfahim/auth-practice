import Input from "@/components/ui/Input";

export default function Page() {
  return (
    <div className="flex items-center flex-1 justify-center">
      <form className="p-3 space-y-4 max-w-lg w-[90%]">
        <Input id="username" name="username" type="text" />
        <Input id="password" name="password" type="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
