import { useSelector, useDispatch } from 'react-redux';
import { Grid, Button } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import FormInput from 'common/components/inputs/FormInput';
import IserTextInput from "common/components/inputs/IserTextInput";
import IserMenuItem from "common/components/IserMenuItem";
import useResponsive from "common/utils/useResponsive";
import LabeledCard from "common/components/Card/LabeledCard";
import LoadingBackdrop from "common/components/backdrops/LoadingBackdrop";
import { Profile, updateProfile } from 'features/account/store/accountSlice';
import { LANGS, Language } from "features/iser/dashboard/components/LanguagePopover";
import { useTranslation } from "react-i18next";
import { RootState } from "rootStore/rootReducer";
import { useForm, Controller } from "react-hook-form";
import { GENDERS } from '../constants';
import { useStateChangeNotifier, getProfileStateSnackbarMap } from 'features/notifiers/useStateChangeNotifiers'
import { triggerNotification } from "features/notifiers/store/notifiersSlice";

// ----------------------------------------------------------------------

const ProfileSettings = () => {

  const { profile, accountReactiveState: { isUpdating }, requestStatus: { profileUpdate } } = useSelector((state: RootState) => state.accountReducer);

  const isMobile = useResponsive('only', 'xs');
  const { handleSubmit, control } = useForm<Profile>();

  const { t } = useTranslation(['profile', 'notifiers']);

  const dispatch = useDispatch();
  useStateChangeNotifier(profileUpdate, getProfileStateSnackbarMap(dispatch, t));


  const onProfileFormSubmit = (data: Profile) => {
    dispatch(triggerNotification())
    dispatch(updateProfile({
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      birthDate: data.birthDate,
      location: data.location,
      language: data.language,
      role: data.role }))}

  return (
    <LabeledCard label={t('profile_settings.profile_form.label')}>
      <LoadingBackdrop open={isUpdating}>
        <form onSubmit={handleSubmit(onProfileFormSubmit)}>
          <Grid container spacing={2}>
            <Controller
              name="firstName"
              control={control}
              defaultValue={profile.firstName}
              render={({ field: { onChange, value } }) => (
                <Grid xs={12 } sm={6} item>
                <FormInput label={t('profile_settings.profile_form.label_first_name')} >
                  <IserTextInput placeholder={profile.firstName} value={value} onChange={onChange}/>
                </FormInput>
              </Grid>
              )}
            />
            <Controller
              name="lastName"
              control={control}
              defaultValue={profile.lastName}
              render={({ field: { onChange, value } }) => (
                <Grid xs={12 } sm={6} item>
                <FormInput label={t('profile_settings.profile_form.label_last_name')}>
                  <IserTextInput placeholder={profile.lastName} value={value} onChange={onChange}/>
                </FormInput>
              </Grid>
              )}
            />
            <Controller
              name="gender"
              control={control}
              defaultValue={profile.gender}
              render={({ field: { onChange, value } }) => (
                <Grid xs={12 } sm={6} item>
                <FormInput label={t('profile_settings.profile_form.label_gender')}>
                  <IserTextInput select value={value} defaultValue={profile.gender} onChange={onChange}>
                    { GENDERS.map((option: string, i: number) => (<IserMenuItem value={option} key={i} > { option } </IserMenuItem>)) }
                  </IserTextInput>
                </FormInput>     
              </Grid>
              )}
            />
            <Controller
              name="birthDate"
              control={control}
              defaultValue={profile.birthDate}
              render={({ field: { onChange, value }}) => (
                <Grid xs={12 } sm={6} item>
                <FormInput label={t('profile_settings.profile_form.label_birth_date')}>
                  {isMobile ? 
                  <DatePicker
                    inputFormat="MM/dd/yyyy"
                    value={value}
                    onChange={onChange}
                    renderInput={(params) => <IserTextInput {...params} defaultValue={profile.birthDate} value={value}  />}
                  />  :
                  <DesktopDatePicker
                    inputFormat="MM/dd/yyyy"
                    value={value}
                    onChange={onChange}
                    renderInput={(params) => <IserTextInput {...params} defaultValue={profile.birthDate} value={value}  />}
                  />}
                </FormInput>
              </Grid>
              )}
            />
            <Controller
              name="location"
              control={control}
              defaultValue={profile.location}
              render={({ field: { onChange, value }}) => (
                <Grid xs={12 } sm={6} item>
                  <FormInput label={t('profile_settings.profile_form.label_location')}>
                    <IserTextInput placeholder={profile.location} value={value} onChange={onChange}/>
                  </FormInput>
                </Grid>
              )}
            />
            <Controller
              name="language"
              control={control}
              defaultValue={profile.language}
              render={({ field: { onChange, value }}) => (
                <Grid xs={12 } sm={6} item>
                  <FormInput label={t('profile_settings.profile_form.label_language')}>
                    <IserTextInput select value={value} onChange={onChange}>
                      { [LANGS.map((language: Language, i: number) => (<IserMenuItem value={language.value} key={i} > { language.label } </IserMenuItem>))]}
                    </IserTextInput>
                  </FormInput>
                </Grid>
              )}
            />
            <Controller
              name="role"
              control={control}
              defaultValue={profile.role}
              render={({ field: { onChange, value }}) => (
                <Grid xs={12 } sm={6} item>
                <FormInput label={t('profile_settings.profile_form.label_user_role')}>
                  <IserTextInput value={value} onChange={onChange} placeholder={profile.role}/>
                </FormInput>
                </Grid>
              )}
            />
            <Grid item display="flex" justifyContent="flex-end" xs={12} sm={6}>
                <Button variant="contained" type="submit" sx={{ marginTop: 4, marginBottom: 0}}>
                  { t('profile_settings.profile_form.button_submit_profile_data') }
                </Button>
              </Grid>
          </Grid>
        </form>
        </LoadingBackdrop>
    </LabeledCard>
  );
}

export default ProfileSettings;
