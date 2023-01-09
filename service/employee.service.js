const EmployeeDataFile = 'employee.json'
const fs = require('fs')


/**
 * Get All Employees Data
 * @returns Employees array
 */
async function getEmployeeData() {
    try {
        const data = fs.readFileSync(EmployeeDataFile)
        return JSON.parse(data)
    } catch (error) {
        throw error
    }
}


/**
 * Get Employee Data By id
 * @param {*} id 
 * @returns Employee Data
 */
async function getEmployeeDataById(id) {
    try {
        const EmployeeData = await getEmployeeData()
        const isEmployee = await checkEmployee(id, EmployeeData, null)
        if (isEmployee.flag) {
            const filterEmployeeData = EmployeeData.filter(item => item.employeeId == id)
            return filterEmployeeData
        }
        else
            throw {message:isEmployee.message}
    } catch (error) {
        throw error
    }
}


/**
 * Add Data to Json File
 * @param {*} data 
 */
async function addDataToFile(data) {
    try {
        const stringifyData = JSON.stringify(data)
        fs.writeFileSync(EmployeeDataFile, stringifyData)
    } catch (error) {
        throw error
    }
}


/**
 * Check if Employee exist or not
 * @param {*} id 
 * @param {*} data 
 * @returns result object
 */
async function checkEmployee(id, data, email) {
    try {
        var result = {}
        if (email != null) {
            var filterData = data.filter(item => item.employeeId == id)
            if (filterData.length != 0) {
                var filterData1 = data.filter(item => item.employeeId != id)
                var checkEmail = filterData1.filter(item => item.email == email)
                if (checkEmail.length != 0) {
                    result.message = "Employee already exist"
                    result.flag = false
                }
                else {
                    result.message = "Employee Found"
                    result.flag = true
                }
            }
            else {
                result.message = "Employee does not exist"
                result.flag = false
            }
        }
        else {
            var filterData = data.filter(item => item.employeeId == id)
            if (filterData.length != 0) {
                result.message = "Employee Exist"
                result.flag = true
            }
            else {
                result.message = "Employee does not exist"
                result.flag = false
            }
        }
        return result
    } catch (error) {
        throw error
    }
}


/**
 * Add Employee Data
 * @param {*} employee 
 * @returns Employees array
 */
async function addEmployeeData(employee) {
    try {
        const EmployeeData = await getEmployeeData()
        const isEmployee = await checkEmployee(employee.id, EmployeeData, employee.email)
        if (!isEmployee.flag) {
            EmployeeData.push(employee)
            await addDataToFile(EmployeeData)
            return await getEmployeeData()
        }
        else {
            throw { message: isEmployee.message }
        }
    } catch (error) {
        throw error
    }
}


/**
 * Update Employee Data
 * @param {*} id 
 * @param {*} employee 
 * @returns Employees array
 */
async function updateEmployeeData(id, employee) {
    try {
        const EmployeeData = await getEmployeeData()
        const isEmployee = await checkEmployee(id, EmployeeData, employee.email)
        if (isEmployee.flag) {
            const filterEmployeeData = EmployeeData.filter(item => item.employeeId != id)
            employee.employeeId = parseInt(id)
            filterEmployeeData.push(employee)
            await addDataToFile(filterEmployeeData)
            return await getEmployeeData()
        }
        else
            throw { message: isEmployee.message }
    } catch (error) {
        throw error
    }
}


/**
 * Delete Employee
 * @param {*} id 
 * @returns employees array
 */
async function deleteEmployeeData(id) {
    try {
        const EmployeeData = await getEmployeeData()
        const isEmployee = await checkEmployee(id, EmployeeData, null)
        if (isEmployee.flag) {
            const filterEmployeeData = EmployeeData.filter(item => item.employeeId != id)
            await addDataToFile(filterEmployeeData)
            return await getEmployeeData()
        }
        else
            throw { message: isEmployee.message }
    } catch (error) {
        throw error
    }
}

module.exports = { getEmployeeData, getEmployeeDataById, addEmployeeData, updateEmployeeData, deleteEmployeeData }