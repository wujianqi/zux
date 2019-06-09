import { Validator, Type, Mock, Ref } from '../../src';
import v from 'shai/lib/validator.esm';

@Validator({isdev: true})
@Mock({divisionCode: '440300'})
export class Library {

    @Type(v.number.int)
    @Ref('uuid')
    id:number;

    @Type(v.string.minlength(10))
    @Ref('chinese')
    title: string;

    @Type(v.string.minlength(10))
    note:string;

    categroy:string;

    file:string;

    @Type(v.number.int)
    point:number;

    @Type(v.string.datetime)
    creatTime:string;

    // @OneToOne(type => User)
    // @JoinColumn()
    //user: User;

    // @OneToMany(type => Download, download => download.library)
    //download: Download[];

}