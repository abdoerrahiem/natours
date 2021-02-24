const fs = require('fs')

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
)

exports.checkID = (req, res, next, value) => {
  const tour = tours.find((tour) => tour.id.toString() === req.params.id)

  if (!tour)
    return res.status(404).json({
      success: false,
      message: 'Invalid ID',
    })

  next()
}

exports.checkBody = (req, res, next) => {
  const { name, price } = req.body

  if (!name || !price)
    return res.status(400).json({
      success: false,
      message: 'Please add the required fields',
    })

  next()
}

// Get all tours
exports.getAllTours = (req, res) =>
  res.status(200).json({
    success: true,
    results: tours.length,
    requestedAt: req.time,
    data: tours,
  })

// Get tour
exports.getTour = (req, res) => {
  const tour = tours.find((tour) => tour.id.toString() === req.params.id)

  res.status(200).json({
    success: true,
    data: tour,
  })
}

// Create tour
exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1
  const newTour = Object.assign({ id: newId }, req.body)

  tours.push(newTour)

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        success: false,
        data: newTour,
      })
    }
  )
}

// Update tour
exports.updateTour = (req, res) => {
  const tour = tours.find((tour) => tour.id.toString() === req.params.id)

  res.status(200).json({
    success: true,
    message: 'Tour updated',
    data: tour,
  })
}

// Delete tour
exports.deleteTour = (req, res) =>
  res.status(204).json({
    success: true,
    message: 'Tour deleted',
    data: null,
  })
