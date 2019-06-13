function greeter(person: string) {
  return "Hello, " + person;
}

let user = "Alex";

document.body.innerHTML = greeter(user);