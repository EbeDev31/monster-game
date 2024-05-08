import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import Intl from 'ember-intl/services/intl';

interface Monster {
    calories: number;
    health: boolean;
    monsterId: number;
}

interface FoodPack {
    value: number;
    poisoned: boolean;
}

export default class ApplicationController extends Controller {
    @service intl!: Intl;
    @tracked activeLocale = this.intl.locale
    @tracked locales = this.intl.locales
    @tracked steps: number = 0;
    @tracked foodBasket: FoodPack[] = [];
    @tracked monsterlist: Monster[] = [];
    @tracked isSetBtnDisable: boolean = true;
    @tracked nextBtnDisable: boolean = true;
    @tracked isGameOver: boolean = false;
    @tracked stopUpdate: boolean = false;
    EmberMonsterList = A(this.monsterlist);
    @tracked darkMode: string = ''

    @tracked userInput = {
        calories: 0,
        numMonsters: 0,
        totalFood: 0,
        foodValue: 0,
        poisonChance: 0,
    };
    @tracked displayedUserInput = {
        calories: 0,
        numMonsters: 0,
        totalFood: 0,
        foodValue: 0,
        poisonChance: 0,
    };

    get isNextBtnDisabled() {
        return this.steps < 1 && this.nextBtnDisable;
    }
    get disableStepBtn() {
        return this.steps === 0 || this.isGameOver;
    }

    get selections() {
        let active = this.activeLocale

        let displayedLocale = ''
        return this.locales.map(locale => {

            if (locale === 'en-us') {
                displayedLocale = 'us'
            } else if (locale === 'nb-no') {
                displayedLocale = 'norsk'
            } else if (locale === 'et-ee') {
                displayedLocale = 'esti'
            }

            else {
                displayedLocale = locale
            }

            return {
                locale,
                displayedLocale,
                active: active.indexOf(locale) > -1
            };
        });
    }

    @action
    setdarkMode() {
        console.log('Setting Dark');

        return this.darkMode = this.darkMode === '' ? 'dark' : ''
    }
    @action
    changeLocale(locale) {
        return this.intl.set('locale', locale);
    }

    @action
    stepsCount() {
        const totalFood = this.userInput.totalFood || 10;
        const numMonsters = this.userInput.numMonsters || 5;
        this.steps = Math.floor(totalFood / numMonsters);
    }

    @action
    getSetDetails(e: Event) {
        const target = e.target as HTMLInputElement;
        const targetId = target.id;
        const targetValue = parseInt(target.value);

        switch (targetId) {
            case 'calories':
                this.userInput = {
                    ...this.userInput,
                    calories: targetValue,
                };
                this.displayedUserInput = {
                    ...this.displayedUserInput,
                    calories: targetValue,
                };

                break;
            case 'monsters':
                this.userInput = {
                    ...this.userInput,
                    numMonsters: targetValue,
                };
                this.displayedUserInput = {
                    ...this.displayedUserInput,
                    numMonsters: targetValue,
                };
                break;
            case 'numFood':
                this.userInput = {
                    ...this.userInput,
                    totalFood: targetValue,
                };
                this.displayedUserInput = {
                    ...this.displayedUserInput,
                    totalFood: targetValue,
                };
                break;
            case 'poisonChance':
                this.userInput = {
                    ...this.userInput,
                    poisonChance: targetValue,
                };
                this.displayedUserInput = {
                    ...this.displayedUserInput,
                    poisonChance: targetValue,
                };
                break;
            default:
                break;
        }
        this.isSetBtnDisable = false;
    }

    @action
    clearField() {
        // debugger
        this.displayedUserInput = {
            calories: 0,
            numMonsters: 0,
            totalFood: 0,
            foodValue: 0,
            poisonChance: 0,
        };
    }

    @action
    createMonsters() {
        const numMonsters = this.userInput.numMonsters || 5;
        this.steps = 0;
        // debugger
        this.monsterlist = [];
        this.EmberMonsterList = A(this.monsterlist);

        for (let i = 0; i < numMonsters; i++) {
            const tempMonster: Monster = {
                calories: this.userInput.calories || 5,
                health: true,
                monsterId: i + 1,
            };
            this.EmberMonsterList.pushObject(tempMonster);
        }
        this.stepsCount();
        this.fillFoodBasket();
        this.isSetBtnDisable = true;
        this.clearField();
    }

    @action
    fillFoodBasket() {
        const totalFood = this.userInput.totalFood || 10;
        for (let i = 0; i < totalFood; i++) {
            const foodPack: FoodPack = {
                value: this.userInput.foodValue
                    ? this.userInput.foodValue
                    : Math.floor(Math.random() * (2 - 0.1)) + 0.1,
                poisoned: false,
            };
            this.foodBasket.push(foodPack);
        }
        this.poisonFood();
    }

    @action
    anyMonsterAlive() {
        let monstersAlive = 0;
        this.monsterlist.map((monster) => {
            if (monster.health) {
                monstersAlive++;
            }
        });
        return monstersAlive > 1;
    }

    @action
    distributeFood() {
        this.monsterlist = this.monsterlist.map((monster) => {
            let newHealth = monster.health;
            if (newHealth) {
                const removedFood = this.foodBasket.splice(0, 1)[0]!;
                //question 4 Interviewer: should poisoned food/calorie
                // be added before subtracting of just automatically subtracted?
                const newCalorie =
                    (removedFood.poisoned ? 0 : removedFood.value) + monster.calories - 1;
                if (newCalorie < 0) {
                    newHealth = false;
                }

                return {
                    monsterId: monster.monsterId,
                    health: newHealth,
                    calories: newCalorie,
                };
            } else {
                return monster;
            }
        });

        if (this.steps === 0) {
            this.nextBtnDisable = false;
        }
        this.steps--;
    }

    @action
    poisonFood() {
        const chance = (this.userInput.poisonChance / 100) * this.foodBasket.length;
        const numCalled: number[] = [];
        for (let i = 0; i < chance; i++) {
            numCalled.push(
                this.generatePoisonIndexes(0, this.foodBasket.length, numCalled),
            );
        }
        numCalled.map((index2bePoisoned) => {
            const foodPack: FoodPack = this.foodBasket[index2bePoisoned]!;
            const poisonedPack: FoodPack = {
                value: foodPack.value,
                poisoned: true,
            };
            this.foodBasket[index2bePoisoned] = poisonedPack;
        });
    }

    @action
    generatePoisonIndexes(min: number, max: number, numArray: number[]): number {
        // debugger
        const rndNum: number = Math.floor(Math.random() * (max - min)) + min;
        return numArray.includes(rndNum)
            ? this.generatePoisonIndexes(min, max, numArray)
            : rndNum;
    }

    @action
    stepAction() {
        this.distributeFood();
        this.isGameOver = !this.anyMonsterAlive();
        if (this.isGameOver) {
            alert('Gaaaame Over!!!!! 1 Monsters remaining');
        }
    }
}
