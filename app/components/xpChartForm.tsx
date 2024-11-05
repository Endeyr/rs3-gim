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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { runemetrics } from '@/lib/const';
import { xpChartFormSchema } from '@/schemas/xpChartFormSchema';
import { PlayerContextI } from '@/types/context';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PlayerContext } from '../context/playerContext';

interface XpChartFormPropsI {
  username: string;
}

const XpChartForm = ({ username }: XpChartFormPropsI) => {
  const {
    updateIsLoading,
    setStatus,
    isLoading,
    isError,
    message,
    isSuccess,
    updateMonthlyXpData,
  } = useContext(PlayerContext) as PlayerContextI;

  const form = useForm<z.infer<typeof xpChartFormSchema>>({
    resolver: zodResolver(xpChartFormSchema),
    defaultValues: {
      skillName: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof xpChartFormSchema>) => {
    updateIsLoading(true);
    setStatus('', 'reset');
    try {
      const monthlyXpResponse = await axios(
        `/api/runemetrics/getMonthlyXp?name=${encodeURIComponent(
          username
        )}&skillId=${encodeURIComponent(values.skillName)}`
      );
      const data = monthlyXpResponse.data;
      updateMonthlyXpData(data);
      setStatus('Player Skill data updated successfully.', 'success');
      form.reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        setStatus(
          error.response?.status === 500
            ? 'Player not found.'
            : error.response
              ? error.response.data.error
              : 'An error occurred',
          'error'
        );
      } else {
        setStatus(`An unexpected error occurred; ${error}`, 'error');
        console.error(`Unexpected error: ${error}`);
      }
    } finally {
      updateIsLoading(false);
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
          id='xp-chart-form'
        >
          <fieldset
            disabled={isLoading}
            className='w-full space-y-4'
            aria-labelledby='xp-chart-form-legend'
          >
            <legend id='search-options' className='sr-only'>
              Search Options
            </legend>
            <FormField
              control={form.control}
              name='skillName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill</FormLabel>
                  <FormControl>
                    <Select
                      name='skillName'
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isLoading}
                      aria-label='Select a skill'
                      aria-required='true'
                      aria-invalid={!!form.formState.errors.skillName}
                    >
                      <SelectTrigger
                        className='w-[180px]'
                        aria-expanded={!!field.value}
                      >
                        <SelectValue placeholder='Select a Skill' />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(runemetrics.skills).map(
                          ([id, skillName]) => (
                            <SelectItem key={id} value={id}>
                              {skillName}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
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
export default XpChartForm;
