import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {v4 as uuid} from "uuid";
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ){}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeeRepository.save(createEmployeeDto)
    return employee
  }

  async findAll() {
    return await this.employeeRepository.find();
  }

  findByLocation(id: number){
    return this.employeeRepository.findBy({
      location:{
        locationId: id
      }
    })
  }

  findOne(id: string) {
    const employee = this.employeeRepository.findOneBy({
      employeeid: id
    })
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      employeeid: id,
      ...updateEmployeeDto
    })
    this.employeeRepository.save(employeeToUpdate)
    return employeeToUpdate
  }

  remove(id: string) {
    this.employeeRepository.delete({
      employeeid: id
    })
    return{
      message:"Employee deleted"
    }
  }
}
