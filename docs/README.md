# Clean Architecture

## Project structure

- `app` directory is only going to focus on `react-router` related things
- `di` (dependency-injection)
- `drizzle` ORM
- `src` represents clean architecture
- `tests/unit` holds tests and mirroring the `application` and `interface-adapters` as it holds the core logic of the application

### `src` (clean architecture)

- `interface-adapters`: holds controllers
- `infrastructure`: holds the implementation of repositories
- `application`: holds the interfaces and use-cases
- `entities`: holds the business entities

#### Interface Adapaters

Our first line of validations. It will ensure that the user input is clean and validated.
Also checks for authorization/ authenicated

- `controllers`/`auth`|`habits`


#### Application

- `repositories`: (habits.repository.interface.ts, users.repository.interface.ts)
- `services`: (authentication.service.interface.ts)
- `use-cases`

the `repository` holds the interface for the repository and tells the actual implementation which methods to want to implement

#### Infrastructure

these are the implementations of the interfaces in `application`.
this also has `.mock` of the interfaces

`mocks` are created in-memory (for testing)

- `repositories`
- `services`

```js
// habits.repository.ts
@injectable() // inversifyJS
export class HabitRepository extends IHabitRepository {
    async createHabit(habit: InsertHabit): Promise<Habit> {
        try {
            const query = db.insert(habitsSchema).values(habit).toString();
            ...
        }
    }
}
```

```js
// habits.repository.mock.ts
export class HabitRepository extends IHabitRepository {
    private _habits: Habit[];

    constructor() {
        this._habits = [];
    }

    async createHabit(habit: InsertHabit): Promise<Habit> {
        try {
            const id = this._habits.length;
            const created = {...habit, id};
            this._habits.push(created);
            return id;
        }
    }
}
```

#### Entities

- `errors`
- `models` - using `zod` because models handle validation
