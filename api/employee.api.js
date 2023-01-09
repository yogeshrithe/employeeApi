const express = require('express')
const router = express.Router()
const Joi = require('joi')
const EmployeeService = require("../service/employee.service")

const EmployeeValidation = Joi.object().keys({
    employeeId: Joi.number().strict().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    hireDate: Joi.string().required(),
})

const UdateEmployeeDataValidation = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    hireDate: Joi.string().required(),
})


/**
 * Get All Employee Data
 */
router.get("/", (req, res) => {
    EmployeeService.getEmployeeData().then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})



/**
 * Get Employee Data By id
 * @param Employee id
 */
router.get("/:id", (req, res) => {
    EmployeeService.getEmployeeDataById(req.params.id).then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})



/**
 * Add Employee Data
 */
router.post("/", async (req, res) => {
    try {
        const result = EmployeeValidation.validate(req.body)
        if (result.error) {
            res.send({ message: 'Data is not Valid' })
        }
        else {
            await EmployeeService.addEmployeeData(req.body).then(data => {
                res.status(200).json(data)
            }).catch(error => {
                res.status(400).json(error)
            })
        }
    }
    catch (error) {
        res.status(400).json(error)
    }
})



/**
 * Update Employee Data
 * @param Employee id
 */
router.put("/:id", async (req, res) => {
    try {
        const result = UdateEmployeeDataValidation.validate(req.body)
        if (result.error) {
            res.send({ message: 'Data is not Valid' })
        }
        else {
            await EmployeeService.updateEmployeeData(req.params.id, req.body).then(data => {
                res.status(200).json(data)
            }).catch(error => {
                res.status(400).json(error)
            })
        }
    } catch (error) {
        res.status(400).json(error)
    }
})



/**
 * Delete Employee
 * @param Employee id
 */
router.delete("/:id", async (req, res) => {
    try {
        await EmployeeService.deleteEmployeeData(req.params.id).then(data => {
            res.status(200).json(data)
        }).catch(error => {
            res.status(400).json(error)
        })
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router