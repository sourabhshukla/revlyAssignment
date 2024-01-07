export default function LoginForm() {
  return (
    <div className="flex flex-col rounded-lg justify-around items-center border-2 w-96 p-8 gap-y-8 border-solid ">
      <h2 className="text-3xl font-bold">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="input input-bordered w-full max-w-xs"
      />
      <input
        type="password"
        placeholder="Password"
        className="input input-bordered w-full max-w-xs"
      />
      <button className="btn btn-block btn-primary">Login</button>
    </div>
  );
}
