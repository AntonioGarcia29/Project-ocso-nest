import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {v4 as uuid} from 'uuid';
import { filter } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>){
  }

  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.save(createProductDto)
    return product;
  }
  findAll() {
    return this.productRepository.find({
      loadEagerRelations: true,
      relations: {
        provider: true,
      }
    });
  }

  findOne(id: string) {
    const product = this.productRepository.findOneBy({
      productId: id,
    })
    if(!product) throw new NotFoundException()
      return product
  }
  findByProvider(id: string){
      return "hola"
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRepository.preload({
      productId: id,
      ...updateProductDto
    })
    if(!productToUpdate) throw new NotFoundException
    this.productRepository.save(productToUpdate)
    return productToUpdate
  }

  async remove(id: string) {
    this.productRepository.delete({
      productId: id
    })
    return {
      message: `objeto con id: ${id}, eliminado`
    }
  }
}
