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
import { runemetrics } from '@/lib/const';
import { isPlayerOutOfDate } from '@/lib/utils';
import { searchBarFormSchema } from '@/schemas/searchBarFormSchema';
import { Quests } from '@/types/api';
import { PlayerContextI } from '@/types/context';
import { PlayerDataI } from '@/types/playerData';
import { MonthlyXpI } from '@/types/xpData';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useContext } from 'react';
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

  const skillIds = Object.keys(runemetrics.skills);

  const onSubmit = async (values: z.infer<typeof searchBarFormSchema>) => {
    updateIsLoading(true);
    setStatus('', 'reset');

    const existingPlayer = playerDataArray.find(
      (player) => player.name === values.name
    );
    const isOutOfDate = !existingPlayer || isPlayerOutOfDate(existingPlayer);

    if (isOutOfDate) {
      try {
        const skillXpRequests = skillIds.map((skillId) =>
          axios<MonthlyXpI>(
            `/api/runemetrics/getMonthlyXp?name=${encodeURIComponent(
              values.name
            )}&skillId=${encodeURIComponent(skillId)}`,
            {
              timeout: 60000,
            }
          ).catch((error) => ({ status: 'rejected', reason: error }))
        );

        const [profileResponse, questResponse] = await Promise.allSettled([
          axios<PlayerDataI>(
            `/api/runemetrics/getProfile?name=${encodeURIComponent(
              values.name
            )}`,
            {
              timeout: 60000,
            }
          ),
          axios<Quests>(
            `/api/runemetrics/getQuest?name=${encodeURIComponent(values.name)}`,
            {
              timeout: 60000,
            }
          ),
        ]);

        if (
          profileResponse.status === 'fulfilled' &&
          profileResponse.value.status === 200 &&
          questResponse.status === 'fulfilled' &&
          questResponse.value.status === 200
        ) {
          const data = {
            ...profileResponse.value.data,
            quests: questResponse.value.data.quests,
          };
          updatePlayerData(data);
        } else {
          if (
            profileResponse.status === 'rejected' ||
            questResponse.status === 'rejected'
          ) {
            setStatus('Failed to fetch profile or quest data', 'error');
          } else {
            if (profileResponse.value.status !== 200) {
              setStatus(
                `Failed to fetch profile: ${profileResponse.value.status}`,
                'error'
              );
            }
            if (questResponse.value.status !== 200) {
              setStatus(
                `Failed to fetch quests: ${questResponse.value.status}`,
                'error'
              );
            }
          }
        }

        // batch request to not overload api
        const chunkSize = 28;
        for (let i = 0; i < skillXpRequests.length; i += chunkSize) {
          const chunk = skillXpRequests.slice(i, i + chunkSize);
          const monthlyXpResponses = await Promise.allSettled([...chunk]);
          monthlyXpResponses.forEach((response) => {
            if (
              response.status === 'fulfilled' &&
              response.value.status === 200 &&
              'data' in response.value
            ) {
              updateMonthlyXpData(response.value.data);
            } else {
              setStatus(`Failed skill XP request: ${response.status}`, 'error');
            }
          });
        }

        setStatus('Player data updated successfully.', 'success');
        form.reset();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setStatus(
            error.response?.status === 500
              ? 'Runescape api unavailable, please try again later'
              : error.response
                ? error.response.data.error
                : 'An error occurred',
            'error'
          );
        } else {
          setStatus(`An unexpected error occurred; ${error}`, 'error');
        }
      } finally {
        updateIsLoading(false);
      }
    } else {
      updateIsLoading(false);
      setStatus('Player data is up to date.', 'error');
    }
  };

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
            <Button type='submit' disabled={isLoading}>
              {!isLoading ? 'Add' : 'Loading...'}
            </Button>
          </div>
        </form>
      </Form>
      {message && (
        <p
          className={`mt-2 w-full break-words ${
            isError
              ? 'text-red-500'
              : isSuccess
                ? 'text-green-500'
                : 'text-primary'
          }`}
          role={isError ? 'alert' : isSuccess ? 'status' : ''}
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
