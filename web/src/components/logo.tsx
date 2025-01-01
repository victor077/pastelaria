import logo from "../assets/pastel.png";

export function Logo() {
  return (
    <div className="text-white flex gap-2  items-center">
      <img src={logo} alt="logo" className="h-14 w-14" />
      <p className="text-xl font-bold">Pastelaria</p>
    </div>
  );
}
