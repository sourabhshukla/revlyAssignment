export default function Header() {
  return (
    <nav className="bg-slate-200 flex justify-end py-2">
      <div className="flex gap-6 cursor-pointer pr-5">
        <button className="btn btn-primary btn-outline">Login</button>
        <button className="btn btn-primary">Register</button>
      </div>
    </nav>
  );
}
