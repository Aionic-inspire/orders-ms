import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { OrderItemDto } from "./order-item.dto";

export class CreateOrderDto {

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each: true}) // validacion interna de cada elemento del array
    @Type(()=>OrderItemDto)
    items: OrderItemDto[]
}
