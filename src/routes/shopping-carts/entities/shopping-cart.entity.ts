import { Column, Entity, Index, ManyToOne, ManyToMany, JoinTable, JoinColumn, RelationId } from 'typeorm';
import { User } from "./../../users/entities/user.entity";
import { Product } from "./../../products/entities/product.entity";
import { Base } from '@/core/entities/base';

@Entity('shoppingcart')
export class ShoppingCart extends Base {
    @Index()
    @Column()
    price: number;

    @Column({ default: false })
    paiedOut: boolean;

    @ManyToOne(() => User, user => user.shoppingCarts)
    @JoinColumn({ name: "userId" })
    user: User;

    @Column()
    userId: number;

    @ManyToMany(type => Product)
    @JoinTable()
    products: Product[]

}
