import { StatusCodes } from 'http-status-codes'
import Product from '../models/Product.js'

const getAllItems = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query
  const queryObject = {}
  if(featured) {
    queryObject.featured = featured === 'true' ? true : false
  }
  if(company) {
    queryObject.company = company
  }
  if(name) {
    queryObject.name = { $regex: name, $options: 'i' }
  }
  if(numericFilters) {
    const operatorMap = {
      '<=': '$lte',
      '<': '$lt',
      '=': '$eq',
      '>': '$gt',
      '>=': '$gte'
    }
    const regex = /\b(<|<=|=|>=|>)\b/g
    let filters = numericFilters.replace(regex, match => `-${operatorMap[match]}-`)
    const options = ['price', 'rating']
    filters = filters.split(',').forEach(item => {
      const [field, operator, value] = item.split('-')
      if(options.includes(field)) {
        queryObject[field] = {[operator]: Number(value)}
      }
    })

  }
  let result = Product.find(queryObject)
  if(sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  }
  else {
    result = result.sort('createdAt')
  }
  if(fields) {
    const fieldList = fields.split(',').join(' ')
    result = result.select(fieldList)
  }
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit
  result = result.skip(skip).limit(limit)
  const products = await result
  res.status(StatusCodes.OK).json({
    success: true,
    page,
    limit,
    totalAmount: await Product.countDocuments(queryObject),
    data: products
  })
}

export default {
  getAllItems
}