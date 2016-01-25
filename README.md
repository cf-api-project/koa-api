# koa-api

Simple 2 resource Mongo-backed API built to explore a new HTTP framework for the
Codefellows 401 course.

## Endpoints

#### Students (`/api/students`)

Full REST suite. Model is as follows:

```js
{
  name: String,
  debt: Number,
  fatigued: { type: Boolean, default: true },
  caffeine: Number
}
```

#### Instructors (`/api/instructors`)

Full REST suite. Model is as follows:

```js
{
  name: { type: String, default: 'Tyler' },
  fucksGiven: { type: Number, default: 0 },
  fatigued: { type: Boolean, default: true },
  caffeine: Number,
  facialHair: Boolean
}
```

## Authors

Written by [Ardian Ajvazi](https://github.com/ardianajvazi),
[Logan Tegman](https://github.com/ltegman),
[Jose Tello](https://github.com/josectello), and
[Gene Troy](https://github.com/energene)

## License

The project is licensed under the terms of the MIT license.
