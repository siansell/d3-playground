# d3 training

Working through https://livebook.manning.com/book/d3js-in-action-third-edition

## Random notes

### SVG

- Something to keep in mind when you’re trying to align shapes in a visualization is that strokes are drawn evenly over the inside and the outside border of SVG shapes.

- Why is there a primitive `<circle />` element, isn't `<ellipse />` sufficient? Compare that there is no `<square />` element. Same for `<line />`.

- a rule of thumb that is generally accepted is that we should consider using canvas rather than SVG if a visualization contains more than 1000 elements.

### Chapter 3 Data

- "Discrete data consists of whole numbers, also called integers, that cannot be subdivided.". What? Discrete data is not necessarily integers.