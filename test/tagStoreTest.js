import {ok, equal, deepEqual} from 'assert';
import TagStore from '../src/client/blog/store/tags';

let tagStore;

describe('Store Tests', function() {

  beforeEach(function() {
    tagStore = new TagStore();
  });

  it('Tests adding tags to the store', function() {

    let tagString = 'test tag';

    // Add a tag, check that it shows up
    let createdTag = tagStore.addTag(tagString);
    equal(tagStore.getAllTags().length, 1, 'Should have one tag in the store');
    equal(createdTag.toString(), tagString, 'Tag string doesn\'t match up');
    equal(createdTag.getCount(), 1, 'Count should be 1');

    // Try adding the same tag, make sure the count incremements
    createdTag = tagStore.addTag(tagString);
    equal(tagStore.getAllTags().length, 1, 'Should have one tag in the store');
    equal(createdTag.getCount(), 2, 'Cound should be 2');
  });

  it('Tests the activating/inactivating of flags', function() {
    let tagString = 'test tag';

    // Add the tag and check
    let createdTag = tagStore.addTag(tagString);
    equal(createdTag.isActive(), false, 'Tag should be inactive'); // Activate the tag createdTag = tagStore.activateTag(tagString);

    // Activate the tag and check
    createdTag = tagStore.activateTag(tagString);
    equal(createdTag.isActive(), true, 'Tag should be active');

    // Deactivate the tag and check
    createdTag = tagStore.deactivateTag(tagString);
    equal(createdTag.isActive(), false, 'Tag should be inactive');
  });

  it('Tests the getting of tags', function() {
    let tagString = 'test tag';
    let tag = tagStore.addTag(tagString);

    equal(tagStore.getActiveTags().length, 0, 'Should be no active flags');
    equal(tagStore.getInactiveTags().length, 1, 'should be one inactive flag');

    // Add a new (inactive) flag, activate the first flag, and check
    tagStore.activateTag(tagString);
    equal(tagStore.getActiveTags().length, 1, 'Should be one active flag');
    equal(tagStore.getInactiveTags().length, 0, 'Should be no inactive flags');
    let newTag = tagStore.addTag('test tag 2');
    equal(tagStore.getInactiveTags().length, 1, 'Should be one inactive flag');

  });

  // TODO check sorting
});
