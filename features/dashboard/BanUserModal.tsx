import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '../../components/Modal';
import { Button } from '../../components/Button';
import { SearchUsers } from '../../graphql/queries';
import { User } from '../../@types/user';
import { client } from '../../graphql/client';
import { UserOption } from './UserOption';
import { AutocompleteList } from '../../components/AutocompleteList';
import { UserOptionPreview } from './UserOptionPreview';

import { banUser } from '../../lib/api';

export function BanUserModal(props) {
  const { isOpen } = props;
  const [submitting, setSubmitting] = useState(false);
  const { handleSubmit, reset, setValue, trigger, watch } = useForm({
    defaultValues: {
      userIds: [],
    },
  });
  const values = watch();
  const isDisabled = !validate(values);

  const handleLoadOptions = async (q: string): Promise<User[]> =>
    client
      .query({ query: SearchUsers, variables: { query: q } })
      .then((d) => {
        return d.data.users.results;
      })
      .catch((e) => {
        return [];
      });

  const handleRenderOption = (option: User) => <UserOption user={option} />;
  const renderHostInput = (user: User) => {
    return <UserOptionPreview user={user} />;
  };

  const onSubmit = (data) => {
    setSubmitting(true);
    banUser(data.userIds)
      .then((r) => {
        if (r.ok) {
          // Give some time to ban users
          setTimeout(() => {
            props.onClose();
          }, 250);
        }
      })
      .catch(console.error)
      .finally(() => setSubmitting(false));
  };

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen]);

  return (
    <Modal
      {...props}
      component="form"
      componentProps={{ onSubmit: handleSubmit(onSubmit) }}
    >
      <ModalContent>
        <ModalHeader>Ban Users</ModalHeader>
        <ModalBody>
          <AutocompleteList
            label="Users"
            addLabel="Add another user"
            renderInput={renderHostInput}
            renderOption={handleRenderOption}
            loadOptions={handleLoadOptions}
            getOptionValue={(option) => option?.id || null}
            onChange={(users) => {
              setValue('userIds', users);
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="default" onClick={() => props.onClose()}>
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            disabled={isDisabled || submitting}
            onClick={() => trigger()}
          >
            Ban Users
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function validate(values) {
  if (!values.userIds?.length || !values.userIds.every(Boolean)) {
    return false;
  }

  return true;
}
