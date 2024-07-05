import { component$, $, useStore } from '@builder.io/qwik';
import { updateLink } from '../../../temporary-links/api'; // Ensure you have an API function to update the link

export const LinkEditForm = component$(({ id, initialUrl, onClose }) => {
  const state = useStore({ url: initialUrl });

  const handleSubmit = $(async () => {
    try {
      await updateLink(id, state.url);
      onClose();
      toaster.add({ title: 'Success', description: 'The link has been updated!' });
    } catch (error) {
      toaster.add({ title: 'Error', description: 'Failed to update the link.' });
    }
  });

  return (
    <div>
      <input type="text" value={state.url} onInput$={(e) => (state.url = e.target.value)} />
      <button onClick$={handleSubmit}>Save</button>
      <button onClick$={onClose}>Cancel</button>
    </div>
  );
});
