export default function RegisterForm() {
  return (
    <div className="flex flex-col rounded-lg justify-around items-center border-2 w-96 p-8 gap-y-8 border-solid ">
      <h2 className="text-3xl font-bold">Register</h2>
      <input
        type="text"
        placeholder="Username"
        className="input input-bordered w-full max-w-xs"
      />
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
      <input
        type="password"
        placeholder="Confirm Password"
        className="input input-bordered w-full max-w-xs"
      />
      <select
        aria-label="label for the select"
        className="select select-bordered w-full max-w-xs"
      >
        <option disabled selected>
          Subject
        </option>
        <option value="Biology">Biology</option>
        <option value="Chemistry">Chemistry</option>
        <option value="Physics">Physics</option>
        <option value="Maths">Maths</option>
      </select>
      <select
        aria-label="label for the select"
        className="select select-bordered w-full max-w-xs"
      >
        <option disabled selected>
          Role
        </option>
        <option value="Student">Student</option>
        <option value="Tutor">Tutor</option>
      </select>
      <select
        aria-label="label for the select"
        className="select select-bordered w-full max-w-xs"
      >
        <option disabled selected>
          Language
        </option>
        <option value="Hindi">Hindi</option>
        <option value="English">English</option>
        <option value="Marathi">Marathi</option>
        <option value="Tamil">Tamil</option>
        <option value="Telugu">Telugu</option>
      </select>
      <select
        aria-label="label for the select"
        className="select select-bordered w-full max-w-xs"
      >
        <option disabled selected>
          Grade
        </option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
      </select>

      <button className="btn btn-block btn-primary">Register</button>
    </div>
  );
}
