// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Game extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Game entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Game entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Game", id.toString(), this);
    }
  }

  static load(id: string): Game | null {
    return changetype<Game | null>(store.get("Game", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get name(): string | null {
    let value = this.get("name");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set name(value: string | null) {
    if (!value) {
      this.unset("name");
    } else {
      this.set("name", Value.fromString(<string>value));
    }
  }

  get leagues(): Array<string> | null {
    let value = this.get("leagues");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set leagues(value: Array<string> | null) {
    if (!value) {
      this.unset("leagues");
    } else {
      this.set("leagues", Value.fromStringArray(<Array<string>>value));
    }
  }
}

export class League extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save League entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save League entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("League", id.toString(), this);
    }
  }

  static load(id: string): League | null {
    return changetype<League | null>(store.get("League", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get game(): string | null {
    let value = this.get("game");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set game(value: string | null) {
    if (!value) {
      this.unset("game");
    } else {
      this.set("game", Value.fromString(<string>value));
    }
  }

  get totalPlayers(): BigInt | null {
    let value = this.get("totalPlayers");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set totalPlayers(value: BigInt | null) {
    if (!value) {
      this.unset("totalPlayers");
    } else {
      this.set("totalPlayers", Value.fromBigInt(<BigInt>value));
    }
  }

  get totalPrize(): BigInt | null {
    let value = this.get("totalPrize");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set totalPrize(value: BigInt | null) {
    if (!value) {
      this.unset("totalPrize");
    } else {
      this.set("totalPrize", Value.fromBigInt(<BigInt>value));
    }
  }

  get minEntry(): BigInt | null {
    let value = this.get("minEntry");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set minEntry(value: BigInt | null) {
    if (!value) {
      this.unset("minEntry");
    } else {
      this.set("minEntry", Value.fromBigInt(<BigInt>value));
    }
  }

  get openTime(): BigInt | null {
    let value = this.get("openTime");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set openTime(value: BigInt | null) {
    if (!value) {
      this.unset("openTime");
    } else {
      this.set("openTime", Value.fromBigInt(<BigInt>value));
    }
  }

  get liveTime(): BigInt | null {
    let value = this.get("liveTime");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set liveTime(value: BigInt | null) {
    if (!value) {
      this.unset("liveTime");
    } else {
      this.set("liveTime", Value.fromBigInt(<BigInt>value));
    }
  }

  get closeTime(): BigInt | null {
    let value = this.get("closeTime");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set closeTime(value: BigInt | null) {
    if (!value) {
      this.unset("closeTime");
    } else {
      this.set("closeTime", Value.fromBigInt(<BigInt>value));
    }
  }

  get status(): string | null {
    let value = this.get("status");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set status(value: string | null) {
    if (!value) {
      this.unset("status");
    } else {
      this.set("status", Value.fromString(<string>value));
    }
  }

  get players(): Array<string> | null {
    let value = this.get("players");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set players(value: Array<string> | null) {
    if (!value) {
      this.unset("players");
    } else {
      this.set("players", Value.fromStringArray(<Array<string>>value));
    }
  }

  get prizes(): Array<string> | null {
    let value = this.get("prizes");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set prizes(value: Array<string> | null) {
    if (!value) {
      this.unset("prizes");
    } else {
      this.set("prizes", Value.fromStringArray(<Array<string>>value));
    }
  }
}

export class Prize extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("claimed", Value.fromBoolean(false));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Prize entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Prize entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Prize", id.toString(), this);
    }
  }

  static load(id: string): Prize | null {
    return changetype<Prize | null>(store.get("Prize", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get league(): string | null {
    let value = this.get("league");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set league(value: string | null) {
    if (!value) {
      this.unset("league");
    } else {
      this.set("league", Value.fromString(<string>value));
    }
  }

  get amount(): BigInt | null {
    let value = this.get("amount");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set amount(value: BigInt | null) {
    if (!value) {
      this.unset("amount");
    } else {
      this.set("amount", Value.fromBigInt(<BigInt>value));
    }
  }

  get createdAt(): BigInt | null {
    let value = this.get("createdAt");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set createdAt(value: BigInt | null) {
    if (!value) {
      this.unset("createdAt");
    } else {
      this.set("createdAt", Value.fromBigInt(<BigInt>value));
    }
  }

  get claimableBy(): string | null {
    let value = this.get("claimableBy");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set claimableBy(value: string | null) {
    if (!value) {
      this.unset("claimableBy");
    } else {
      this.set("claimableBy", Value.fromString(<string>value));
    }
  }

  get claimed(): boolean {
    let value = this.get("claimed");
    return value!.toBoolean();
  }

  set claimed(value: boolean) {
    this.set("claimed", Value.fromBoolean(value));
  }

  get claimedAt(): BigInt | null {
    let value = this.get("claimedAt");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set claimedAt(value: BigInt | null) {
    if (!value) {
      this.unset("claimedAt");
    } else {
      this.set("claimedAt", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class LeaguePlayer extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("isWinner", Value.fromBoolean(false));
    this.set("isBlocked", Value.fromBoolean(false));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save LeaguePlayer entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save LeaguePlayer entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("LeaguePlayer", id.toString(), this);
    }
  }

  static load(id: string): LeaguePlayer | null {
    return changetype<LeaguePlayer | null>(store.get("LeaguePlayer", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get nickName(): string | null {
    let value = this.get("nickName");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set nickName(value: string | null) {
    if (!value) {
      this.unset("nickName");
    } else {
      this.set("nickName", Value.fromString(<string>value));
    }
  }

  get joinedAt(): BigInt | null {
    let value = this.get("joinedAt");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set joinedAt(value: BigInt | null) {
    if (!value) {
      this.unset("joinedAt");
    } else {
      this.set("joinedAt", Value.fromBigInt(<BigInt>value));
    }
  }

  get user(): string | null {
    let value = this.get("user");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set user(value: string | null) {
    if (!value) {
      this.unset("user");
    } else {
      this.set("user", Value.fromString(<string>value));
    }
  }

  get league(): string | null {
    let value = this.get("league");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set league(value: string | null) {
    if (!value) {
      this.unset("league");
    } else {
      this.set("league", Value.fromString(<string>value));
    }
  }

  get isWinner(): boolean {
    let value = this.get("isWinner");
    return value!.toBoolean();
  }

  set isWinner(value: boolean) {
    this.set("isWinner", Value.fromBoolean(value));
  }

  get isBlocked(): boolean {
    let value = this.get("isBlocked");
    return value!.toBoolean();
  }

  set isBlocked(value: boolean) {
    this.set("isBlocked", Value.fromBoolean(value));
  }
}

export class User extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("isAdmin", Value.fromBoolean(false));
    this.set("isBlocked", Value.fromBoolean(false));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save User entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save User entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("User", id.toString(), this);
    }
  }

  static load(id: string): User | null {
    return changetype<User | null>(store.get("User", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): string | null {
    let value = this.get("address");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set address(value: string | null) {
    if (!value) {
      this.unset("address");
    } else {
      this.set("address", Value.fromString(<string>value));
    }
  }

  get totalLeagues(): BigInt | null {
    let value = this.get("totalLeagues");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set totalLeagues(value: BigInt | null) {
    if (!value) {
      this.unset("totalLeagues");
    } else {
      this.set("totalLeagues", Value.fromBigInt(<BigInt>value));
    }
  }

  get totalLeaguesWinner(): BigInt | null {
    let value = this.get("totalLeaguesWinner");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set totalLeaguesWinner(value: BigInt | null) {
    if (!value) {
      this.unset("totalLeaguesWinner");
    } else {
      this.set("totalLeaguesWinner", Value.fromBigInt(<BigInt>value));
    }
  }

  get isAdmin(): boolean {
    let value = this.get("isAdmin");
    return value!.toBoolean();
  }

  set isAdmin(value: boolean) {
    this.set("isAdmin", Value.fromBoolean(value));
  }

  get isBlocked(): boolean {
    let value = this.get("isBlocked");
    return value!.toBoolean();
  }

  set isBlocked(value: boolean) {
    this.set("isBlocked", Value.fromBoolean(value));
  }

  get leaguePlayersByUser(): Array<string> | null {
    let value = this.get("leaguePlayersByUser");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set leaguePlayersByUser(value: Array<string> | null) {
    if (!value) {
      this.unset("leaguePlayersByUser");
    } else {
      this.set(
        "leaguePlayersByUser",
        Value.fromStringArray(<Array<string>>value)
      );
    }
  }

  get prizes(): Array<string> | null {
    let value = this.get("prizes");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set prizes(value: Array<string> | null) {
    if (!value) {
      this.unset("prizes");
    } else {
      this.set("prizes", Value.fromStringArray(<Array<string>>value));
    }
  }
}

export class Log extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("log", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Log entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Log entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Log", id.toString(), this);
    }
  }

  static load(id: string): Log | null {
    return changetype<Log | null>(store.get("Log", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get log(): string {
    let value = this.get("log");
    return value!.toString();
  }

  set log(value: string) {
    this.set("log", Value.fromString(value));
  }
}

export class AllLog extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("logs", Value.fromStringArray(new Array(0)));
    this.set("nextId", Value.fromI32(0));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save AllLog entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save AllLog entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("AllLog", id.toString(), this);
    }
  }

  static load(id: string): AllLog | null {
    return changetype<AllLog | null>(store.get("AllLog", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get logs(): Array<string> {
    let value = this.get("logs");
    return value!.toStringArray();
  }

  set logs(value: Array<string>) {
    this.set("logs", Value.fromStringArray(value));
  }

  get nextId(): i32 {
    let value = this.get("nextId");
    return value!.toI32();
  }

  set nextId(value: i32) {
    this.set("nextId", Value.fromI32(value));
  }
}
