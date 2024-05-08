import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import Intl from 'ember-intl/services/intl';

export default class ApplicationRoute extends Route {
    @service intl!: Intl;


    async beforeModel() {
        this.intl.setLocale('nb-no');
    }
}