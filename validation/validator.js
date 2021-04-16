exports.validate = async (schema, data) => {
    try {
      await schema.validateAsync(data, { abortEarly: false })
    } catch (e) {
      throw new Error(e)
    }
  }