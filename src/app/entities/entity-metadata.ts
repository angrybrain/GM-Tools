import { EntityMetadataMap } from '@ngrx/data';
import { Character } from '../models/character';

const entityMetadata: EntityMetadataMap = {
    Characters: {
        entityName: 'Characters',
        selectId: (character: Character) => character._id,
        entityDispatcherOptions: { optimisticAdd: true, optimisticUpdate: true }
    },
};

const pluralNames = { Characters: 'Characters' };

export const entityConfig = {
    pluralNames,
    entityMetadata,
};