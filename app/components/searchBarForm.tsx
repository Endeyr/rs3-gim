'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { fetchProfileAndQuests } from '@/lib/api/fetchProfileAndQuests';
import { fetchSkillXp } from '@/lib/api/fetchSkillXp';
import { configureAxiosWithRetry } from '@/lib/axiosConfig';
import { isPlayerOutOfDate } from '@/lib/utils';
import { searchBarFormSchema } from '@/schemas/searchBarFormSchema';
import type { PlayerContextI } from '@/types/context';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useContext, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PlayerContext } from '../context/playerContext';

const SearchBarForm: React.FC = () => {
  const {
    playerDataArray,
    updatePlayerData,
    updateIsLoading,
    setStatus,
    isLoading,
    isError,
    message,
    isSuccess,
    updateMonthlyXpData,
  } = useContext(PlayerContext) as PlayerContextI;

  const form = useForm<z.infer<typeof searchBarFormSchema>>({
    resolver: zodResolver(searchBarFormSchema),
    defaultValues: {
      name: '',
    },
  });

  const controllerRef = useRef<AbortController | null>(null);

  const onSubmit = async (values: z.infer<typeof searchBarFormSchema>) => {
    updateIsLoading(true);
    setStatus(
      'Fetching from Runescape API can take up to a minute, please wait...',
      'info'
    );
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;

    const existingPlayer = playerDataArray.find(
      (player) => player.name === values.name
    );
    const isOutOfDate = !existingPlayer || isPlayerOutOfDate(existingPlayer);

    if (isOutOfDate) {
      try {
        await fetchProfileAndQuests(values.name, signal, updatePlayerData);
        await fetchSkillXp(values.name, signal, updateMonthlyXpData);
        setStatus('Player data updated successfully.', 'success');
        form.reset();
      } catch (error) {
        if (signal.aborted) {
          setStatus('Fetch aborted.', 'error');
        } else if (axios.isAxiosError(error)) {
          setStatus(
            error.response?.status === 500
              ? 'Runescape api unavailable, please try again later.'
              : error.response
                ? error.response.data.error
                : 'An error occurred.',
            'error'
          );
        } else {
          setStatus(`An unexpected error occurred: ${error}`, 'error');
        }
      } finally {
        updateIsLoading(false);
      }
    } else {
      updateIsLoading(false);
      setStatus('Player data is up to date.', 'error');
    }
  };

  useEffect(() => {
    setStatus('', 'reset');
    configureAxiosWithRetry({
      retries: 3,
      timeout: 60000,
      shouldRetry: () => {
        return true;
      },
    });
    return () => {
      if (controllerRef.current) {
        controllerRef.current?.abort();
      }
    };
  }, [setStatus]);

  return (
    <div className='mx-auto w-full px-2'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex w-full flex-col items-center justify-evenly space-y-4'
          aria-busy={isLoading}
          aria-live='polite'
        >
          <fieldset
            disabled={isLoading}
            className='w-full space-y-4'
            aria-labelledby='search-form-legend'
          >
            <legend id='search-options' className='sr-only'>
              Search Options
            </legend>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      data-testid='form-input-username'
                      placeholder='Runescape Username'
                      {...field}
                      disabled={isLoading}
                      aria-describedby='username-description username-error'
                      aria-invalid={!!form.formState.errors.name}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
          <div className='w-full'>
            <Button
              className='h-12 w-full md:w-1/2'
              data-testid='form-submit-btn'
              type='submit'
              disabled={isLoading}
            >
              {!isLoading ? (
                'Add'
              ) : (
                <Spinner
                  className='dark:text-color-black text-color-white'
                  size={'small'}
                >
                  Loading...
                </Spinner>
              )}
            </Button>
          </div>
        </form>
      </Form>
      {message && (
        <p
          data-testid='status-message'
          className={`mt-2 w-full break-words ${
            isError
              ? 'text-red-500'
              : isSuccess
                ? 'text-green-500'
                : 'text-primary'
          }`}
          role={isError ? 'alert' : isSuccess ? 'status' : 'info'}
          aria-live='polite'
          aria-atomic='true'
        >
          {message}
        </p>
      )}
    </div>
  );
};
export default SearchBarForm;
