import { Component, ElementRef, ViewChild } from '@angular/core';
import { ICard } from '../model/card.model';
import { UuidService } from '../services/uuid.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  cards: Array<ICard> = [
    {
      id: '1',
      title: 'Web Development',
      description: 'Learn HTML, CSS, JavaScript and Angular.',
      image: 'https://miro.medium.com/v2/resize:fit:1400/1*szBsfY6lp8A0jb1zOvJ0mw.jpeg',
      category: 'Technology',
      price: 1500,
      rating: 4.5,
      isActive: true,
    },
    {
      id: '2',
      title: 'UI/UX Design',
      description: 'Learn modern UI/UX design principles.',
      image: 'https://img.freepik.com/premium-vector/gradient-ui-ux-design-illustration_23-2151514787.jpg?semt=ais_hybrid',
      category: 'Design',
      price: 2000,
      rating: 4.8,
      isActive: true,
    },
    {
      id: '3',
      title: 'Python Programming',
      description: '',
      image: 'https://www.lifewire.com/thmb/kl3swkmAw2qcYBkxsOs9jIKsoFk=/3644x2733/filters:fill(auto,1)/database-157334670-5c29939d46e0fb0001edf766.jpg',
      category: 'Programming',
      price: 1800,
      rating: 4.6,
      isActive: false,
    },
    {
      id: '4',
      title: 'Database Management',
      description: '',
      image: 'https://www.lifewire.com/thmb/kl3swkmAw2qcYBkxsOs9jIKsoFk=/3644x2733/filters:fill(auto,1)/database-157334670-5c29939d46e0fb0001edf766.jpg',
      category: 'Database',
      price: 1200,
      rating: 4.3,
      isActive: true,
    },
    {
      id: '5',
      title: 'Node.js Development',
      description: 'Learn backend development using Node.js.',
      image: 'https://tse1.mm.bing.net/th/id/OIP._KotchVueJk8ZgkuzgrhNgHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      category: 'Backend',
      price: 2500,
      rating: 4.7,
      isActive: true,
    }
  ];
  @ViewChild('title') title!: ElementRef<HTMLInputElement>;
  @ViewChild('description') description!: ElementRef<HTMLInputElement>;
  @ViewChild('image') image!: ElementRef<HTMLInputElement>;
  @ViewChild('category') category!: ElementRef<HTMLInputElement>;
  @ViewChild('price') price!: ElementRef<HTMLInputElement>;
  @ViewChild('rating') rating!: ElementRef<HTMLInputElement>;
  @ViewChild('isActive') isActive!: ElementRef<HTMLInputElement>;

  isEditMode: boolean = false;
  isEditId: string = '';
  constructor(private _uuidService: UuidService,
    private _snackBar: SnackbarService
  ) {
    const storedCards = localStorage.getItem('cards');

    if (storedCards) {
      this.cards = JSON.parse(storedCards);
    } else {
      localStorage.setItem('cards', JSON.stringify(this.cards));
    }
  }
  onAddCard() {
    let newCard: ICard = {
      id: this._uuidService.generateUUID(),
      title: this.title.nativeElement.value,
      description: this.description.nativeElement.value,
      image: this.image.nativeElement.value,
      category: this.category.nativeElement.value,
      price: +this.price.nativeElement.value,
      rating: +this.rating.nativeElement.value,
      isActive: this.isActive.nativeElement.value == 'yes' ? true : false,
    }
    this.cards.unshift(newCard);
    localStorage.setItem('cards', JSON.stringify(this.cards));
    this._snackBar.snackbar('New Card Create Succeessfully!!!');
    this.title.nativeElement.value = '';
    this.description.nativeElement.value = '';
    this.image.nativeElement.value = '';
    this.category.nativeElement.value = '';
    this.price.nativeElement.value = '';
    this.rating.nativeElement.value = '';
    this.isActive.nativeElement.value == 'yes'
  }
  onEdit(card: ICard) {
    this.title.nativeElement.value = card.title;
    this.description.nativeElement.value = card.description;
    this.image.nativeElement.value = card.image;
    this.category.nativeElement.value = card.category;
    this.price.nativeElement.value = String(card.price);
    this.rating.nativeElement.value = String(card.rating);
    this.isActive.nativeElement.value = card.isActive ? 'yes' : 'no';
    this.isEditMode = true;
    this.isEditId = card.id;
  }
  onUpdateCard() {
    let updateObj: ICard = {
      title: this.title.nativeElement.value,
      description: this.description.nativeElement.value,
      image: this.image.nativeElement.value,
      category: this.category.nativeElement.value,
      price: +this.price.nativeElement.value,
      rating: +this.rating.nativeElement.value,
      isActive: this.isActive.nativeElement.value == 'yes' ? true : false,
      id: this.isEditId
    }
    let getIndex = this.cards.findIndex(card => card.id === this.isEditId);
    this.cards[getIndex] = updateObj;
    localStorage.setItem('cards', JSON.stringify(this.cards));
    this.isEditId = '';
    this._snackBar.snackbar('Card Updated Succeessfully!!!');
    this.title.nativeElement.value = '';
    this.description.nativeElement.value = '';
    this.image.nativeElement.value = '';
    this.category.nativeElement.value = '';
    this.price.nativeElement.value = '';
    this.rating.nativeElement.value = '';
    this.isActive.nativeElement.value == 'yes'
    this.isEditMode = false;
  }
  onDelete(id: string) {
    let isConform = confirm('Are you sure you want to delete this card?');
    if (isConform) {
      let getIndex = this.cards.findIndex(card => card.id = id);
      if (getIndex !== -1) {
        this.cards.splice(getIndex, 1);
        localStorage.setItem('cards', JSON.stringify(this.cards));
        this._snackBar.snackbar('Card Deleted Successfully!!');
      }
    } else {
      this._snackBar.snackbar('Card is not delete!!');
    }
  }
}
